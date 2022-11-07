import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function StarwarTable() {
    const [data, setData] = React.useState([]);
    const [apidata, setApidata] = React.useState([]);
    const [loading, setLoading] = React.useState(0);
    const [sortedby, setSortedby] = React.useState("");
    const [sortedmode, setSortedmode] = React.useState("");
    const [searchstr, setSearchstr] = React.useState("");
    React.useEffect(() => {
        fetch("http://localhost:3000/api/peoples")
            .then((results) => results.json())
            .then((data) => {
                setData(data.results);
                setApidata(data.results);
                setLoading(1);
            });
    }, []);
    const sortByProperty = (property, mode) => {
        if (mode === "desc") {
            return function (a, b) {
                var start = (property === 'height' || property === 'mass') ? parseInt(a[property]) : a[property]
                var end = (property === 'height' || property === 'mass') ? parseInt(b[property]) : b[property]
                if (start > end) return 1;
                else if (start < end) return -1;

                return 0;
            };
        } else {
            return function (a, b) {
                var start = (property === 'height' || property === 'mass') ? parseInt(a[property]) : a[property]
                var end = (property === 'height' || property === 'mass') ? parseInt(b[property]) : b[property]
                if (start < end) return 1;
                else if (start > end) return -1;
                
                return 0;
            };
        }
    };
    const searchByProperty = (search_str) => {
        return apidata.filter((item) => {
            return (
                item.name.toLowerCase().includes(search_str.toLowerCase()) ||
                item.gender.toLowerCase().includes(search_str.toLowerCase()) ||
                item.birth_year.toLowerCase().includes(search_str.toLowerCase())
            );
        });
    };
    const handleSort = (e) => {
        var sorted;
        setSortedby(e.target.id);
        if (sortedby === e.target.id && sortedmode === "headerSortUp") {
            sorted = data.sort(sortByProperty(e.target.id, "asc"));
            setSortedmode("headerSortDown");
        } else if (
            sortedby === e.target.id &&
            sortedmode === "headerSortDown"
        ) {
            sorted = data.sort(sortByProperty(e.target.id, "desc"));
            setSortedmode("headerSortUp");
        } else {
            sorted = data.sort(sortByProperty(e.target.id, "desc"));
            setSortedmode("headerSortUp");
        }
        setData(sorted);
    };
    const handleSearch = (e) => {
        var search_str = e.target.value;
        setSearchstr(search_str)
        if(search_str.length>=1){
            var search_result = searchByProperty(search_str);
            setData(search_result);
        }
        
    
    };
    const handleClear = (e) => {
        setSearchstr('')
        setData(apidata);
    };
    return (
        <div>
            <h4>StarWar Table</h4>
            <div className="searchable-header">
                <input
                    data-testid="search-string"
                    type="text"
                    className="search"
                    placeholder="Search by name, gender, birth year"
                    value={searchstr}
                    onChange={handleSearch}
                />
                <button data-testid="clear-btn" className={searchstr === '' ? 'clear-btn disabled-btn' : 'clear-btn'} onClick={handleClear} disabled={searchstr===''?true:false}>
                    Clear
                </button>
            </div>
            {loading === 0 && <Skeleton count={5} />}
            {loading === 1 && data.length === 0 && (
                <div className="message-block" data-testid="message-block">
                No data found as per your search!
              </div>
                )}
            {loading === 1 && data.length > 0 && (
                <table className="sortable" data-testid="sortable-table">
                    <thead>
                        <tr>
                            <th
                                className={
                                    sortedby === "name"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="name"
                                data-testid="head_name">
                                Name
                            </th>
                            <th
                                className={
                                    sortedby === "gender"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="gender"
                                data-testid="head_gender">
                                Gender
                            </th>
                            <th
                                className={
                                    sortedby === "birth_year"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="birth_year"
                                data-testid="head_birth_year">
                                Birth Year
                            </th>
                            <th
                                className={
                                    sortedby === "height"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="height"
                                data-testid="head_height">
                                Height
                            </th>
                            <th
                                className={
                                    sortedby === "mass"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="mass"
                                data-testid="head_mass">
                                Mass
                            </th>
                            <th
                                className={
                                    sortedby === "skin_color"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="skin_color"
                                data-testid="head_skin_color">
                                Skin Color
                            </th>
                            <th
                                className={
                                    sortedby === "hair_color"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="hair_color"
                                data-testid="head_hair_color">
                                Hair Color
                            </th>
                            <th
                                className={
                                    sortedby === "eye_color"
                                        ? `header ${sortedmode}`
                                        : "header"
                                }
                                onClick={handleSort}
                                id="head_eye_color"
                                data-testid="head_eye_color">
                                Eye Color
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 &&
                            data.map((value, index) => (
                                <tr key={index} id={value}>
                                    <td>
                                        <a
                                            href={value.url}
                                            target="_blank"
                                            rel="noreferrer">
                                            {value.name}
                                        </a>
                                    </td>
                                    <td>{value.gender}</td>
                                    <td>{value.birth_year}</td>
                                    <td>{value.height}</td>
                                    <td>{value.mass}</td>
                                    <td>{value.skin_color}</td>
                                    <td>{value.hair_color}</td>
                                    <td>{value.eye_color}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
