const Data = {
    reqData(url){
        const array = [];
        array.push({ url : url });
        return fetch(`http://localhost:3000/api/url`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(array)
            }
        ).then(res => res.json()
        ).then((result) => {
                return result;
            }
        )
    }
}
export default Data;