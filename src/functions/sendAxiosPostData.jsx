import axios from "axios";

export default function sendAxiosPostData(url, data) {
    // let responseData = {data: {}, error: {}};
    // let errorData = {};

    return axios.post(url, data)
        .then(async response => {
            const responseData = await response.json();
            console.log(responseData.data)
        });
        // .catch((error) => {
        //     errorData = error.response.data;
        // });

    // return responseData;
}
