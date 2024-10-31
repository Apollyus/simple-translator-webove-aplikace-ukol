import React, { useEffect, useState } from "react";

export default function Test(){
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/posts")
            .then(response => setData(response.json()));
    }, []);

    return(
        <>
            <div>Test</div>
            <div>{data}</div>
        </>
    );
}