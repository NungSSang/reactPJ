console.clear();
import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
  Navigate
} from "https://cdn.skypack.dev/react-router-dom@6";

function ShowMovieDetail() {
  const location = useLocation(); // NavLink에서 전달된 state 접근
  const imdbID = location.state?.imdbID; // 전달받은 imdbID
  const apiKey = "6a1a8c10";

  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbID) return;

    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&plot=full`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovieDetail(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [imdbID, apiKey]);

  if (error) {
    return <p style={{ color: "red" }}>오류: {error}</p>;
  }

  if (!movieDetail) {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src={
          movieDetail.Poster !== "N/A"
            ? movieDetail.Poster
            : "https://nowbegin.com/Data/Upload/default/noimg.jpg"
        }
        alt={movieDetail.Title}
        style={{
          width: "300px",
          height: "auto",
          margin: "0 auto", // 가로축 가운데 정렬
          display: "block", // block 요소로 설정
          marginBottom: "20px" // 아래 간격
        }}
      />
      <h1>{movieDetail.Title}</h1>
      <p>
        ⭐ <strong>평점:</strong> {movieDetail.imdbRating}/10
      </p>
      <p>
        🎬 <strong>런타임:</strong> {movieDetail.Runtime}
      </p>
      <p>
        📅 <strong>출시일:</strong> {movieDetail.Released}
      </p>
      <p>
        🎭 <strong>장르:</strong> {movieDetail.Genre}
      </p>
      <p>
        📝 <strong>줄거리:</strong> {movieDetail.Plot}
      </p>
    </div>
  );
}

function ShowMovie() {
  const location = useLocation(); // location을 통해 state를 가져옵니다.
  const searchQuery = location.state?.searchQuery || ""; // 기본값을 빈 문자열로 설정

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "6a1a8c10";
  const page = 3;

  useEffect(() => {
    if (!searchQuery) return;

    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search); // 영화 목록 상태 업데이트
      })
      .catch((error) => {
        setError(error.message); // 에러 상태 업데이트
      });
  }, [searchQuery, apiKey]);

  return (
    <div>
      <h1>영화 검색 결과</h1>
      {error && <p style={{ color: "red" }}>오류: {error}</p>}
      {movies.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "20px"
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              style={{ border: "1px solid #ccc", padding: "10px" }}
            >
              <h3>{movie.Title}</h3>
              <p>연도: {movie.Year}</p>
              <NavLink
                to={`/ShowMovieDetail/${movie.imdbID}`} // imdbID를 URL로 전달
                state={{ imdbID: movie.imdbID }} // state로 imdbID 전달
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://nowbegin.com/Data/Upload/default/noimg.jpg"
                  }
                  alt={movie.Title}
                  style={{ width: "100%", height: "auto" }}
                />
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "#fff",
    marginRight: "10px",
    flex: "1"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="영화 제목을 입력해 주세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          검색
        </button>
      </form>
    </>
  );
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = (searchQuery) => {
    navigate("/showMovie", { state: { searchQuery } });
  };

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#141414",
    color: "#fff",
    minHeight: "100vh"
  };

  return (
    <div style={containerStyle}>
      {location.pathname !== "/" && <SearchBar onSearch={onSearch} />}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>환영합니다!</h1>
              <SearchBar onSearch={onSearch} />
            </div>
          }
        />
        <Route path="/showMovie" element={<ShowMovie />} />
        <Route path="/ShowMovieDetail/:imdbID" element={<ShowMovieDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
