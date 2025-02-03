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
Navigate } from
"https://cdn.skypack.dev/react-router-dom@6";

function ShowMovieDetail() {var _location$state;
  const location = useLocation(); // NavLink에서 전달된 state 접근
  const imdbID = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.imdbID; // 전달받은 imdbID
  const apiKey = "6a1a8c10";

  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbID) return;

    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&plot=full`;
    fetch(url).
    then(response => {
      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }
      return response.json();
    }).
    then(data => {
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovieDetail(data);
    }).
    catch(error => {
      setError(error.message);
    });
  }, [imdbID, apiKey]);

  if (error) {
    return /*#__PURE__*/React.createElement("p", { style: { color: "red" } }, "\uC624\uB958: ", error);
  }

  if (!movieDetail) {
    return /*#__PURE__*/React.createElement("p", null, "\uB85C\uB529 \uC911...");
  }

  return /*#__PURE__*/(
    React.createElement("div", { style: { textAlign: "center", marginTop: "50px" } }, /*#__PURE__*/
    React.createElement("img", {
      src:
      movieDetail.Poster !== "N/A" ?
      movieDetail.Poster :
      "https://nowbegin.com/Data/Upload/default/noimg.jpg",

      alt: movieDetail.Title,
      style: {
        width: "300px",
        height: "auto",
        margin: "0 auto", // 가로축 가운데 정렬
        display: "block", // block 요소로 설정
        marginBottom: "20px" // 아래 간격
      } }), /*#__PURE__*/

    React.createElement("h1", null, movieDetail.Title), /*#__PURE__*/
    React.createElement("p", null, "\u2B50 ", /*#__PURE__*/
    React.createElement("strong", null, "\uD3C9\uC810:"), " ", movieDetail.imdbRating, "/10"), /*#__PURE__*/

    React.createElement("p", null, "\uD83C\uDFAC ", /*#__PURE__*/
    React.createElement("strong", null, "\uB7F0\uD0C0\uC784:"), " ", movieDetail.Runtime), /*#__PURE__*/

    React.createElement("p", null, "\uD83D\uDCC5 ", /*#__PURE__*/
    React.createElement("strong", null, "\uCD9C\uC2DC\uC77C:"), " ", movieDetail.Released), /*#__PURE__*/

    React.createElement("p", null, "\uD83C\uDFAD ", /*#__PURE__*/
    React.createElement("strong", null, "\uC7A5\uB974:"), " ", movieDetail.Genre), /*#__PURE__*/

    React.createElement("p", null, "\uD83D\uDCDD ", /*#__PURE__*/
    React.createElement("strong", null, "\uC904\uAC70\uB9AC:"), " ", movieDetail.Plot)));



}

function ShowMovie() {var _location$state2;
  const location = useLocation(); // location을 통해 state를 가져옵니다.
  const searchQuery = ((_location$state2 = location.state) === null || _location$state2 === void 0 ? void 0 : _location$state2.searchQuery) || ""; // 기본값을 빈 문자열로 설정

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "6a1a8c10";
  const page = 3;

  useEffect(() => {
    if (!searchQuery) return;

    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`;

    fetch(url).
    then(response => {
      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }
      return response.json();
    }).
    then(data => {
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovies(data.Search); // 영화 목록 상태 업데이트
    }).
    catch(error => {
      setError(error.message); // 에러 상태 업데이트
    });
  }, [searchQuery, apiKey]);

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", null, "\uC601\uD654 \uAC80\uC0C9 \uACB0\uACFC"),
    error && /*#__PURE__*/React.createElement("p", { style: { color: "red" } }, "\uC624\uB958: ", error),
    movies.length > 0 ? /*#__PURE__*/
    React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px" } },


    movies.map((movie) => /*#__PURE__*/
    React.createElement("div", {
      key: movie.imdbID,
      style: { border: "1px solid #ccc", padding: "10px" } }, /*#__PURE__*/

    React.createElement("h3", null, movie.Title), /*#__PURE__*/
    React.createElement("p", null, "\uC5F0\uB3C4: ", movie.Year), /*#__PURE__*/
    React.createElement(NavLink, {
      to: `/ShowMovieDetail/${movie.imdbID}` // imdbID를 URL로 전달
      , state: { imdbID: movie.imdbID } // state로 imdbID 전달
    }, /*#__PURE__*/
    React.createElement("img", {
      src:
      movie.Poster !== "N/A" ?
      movie.Poster :
      "https://nowbegin.com/Data/Upload/default/noimg.jpg",

      alt: movie.Title,
      style: { width: "100%", height: "auto" } }))))) : /*#__PURE__*/






    React.createElement("p", null, "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.")));



}
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = e => {
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
    flex: "1" };


  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer" };


  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("form", {
      onSubmit: handleSearch,
      style: { display: "flex", marginBottom: "20px" } }, /*#__PURE__*/

    React.createElement("input", {
      type: "text",
      placeholder: "\uC601\uD654 \uC81C\uBAA9\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.",
      value: query,
      onChange: e => setQuery(e.target.value),
      style: inputStyle }), /*#__PURE__*/

    React.createElement("button", { type: "submit", style: buttonStyle }, "\uAC80\uC0C9"))));





};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = searchQuery => {
    navigate("/showMovie", { state: { searchQuery } });
  };

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#141414",
    color: "#fff",
    minHeight: "100vh" };


  return /*#__PURE__*/(
    React.createElement("div", { style: containerStyle },
    location.pathname !== "/" && /*#__PURE__*/React.createElement(SearchBar, { onSearch: onSearch }), /*#__PURE__*/
    React.createElement(Routes, null, /*#__PURE__*/
    React.createElement(Route, {
      path: "/",
      element: /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "\uD658\uC601\uD569\uB2C8\uB2E4!"), /*#__PURE__*/
      React.createElement(SearchBar, { onSearch: onSearch })) }), /*#__PURE__*/



    React.createElement(Route, { path: "/showMovie", element: /*#__PURE__*/React.createElement(ShowMovie, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "/ShowMovieDetail/:imdbID", element: /*#__PURE__*/React.createElement(ShowMovieDetail, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "*", element: /*#__PURE__*/React.createElement(Navigate, { to: "/" }) }))));



};

function Root() {
  return /*#__PURE__*/(
    React.createElement(Router, null, /*#__PURE__*/
    React.createElement(App, null)));


}

ReactDOM.render( /*#__PURE__*/React.createElement(Root, null), document.getElementById("root"));