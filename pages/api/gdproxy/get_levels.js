import axios from "axios";


const handle = async (req, res) => {
    const { user, page } = req.query
    let pages = await axios.get(`https://gdbrowser.com/api/search/${user}?page=0&count=1&user`)
    let levels = await axios.get(`https://gdbrowser.com/api/search/${user}?page=${page}&count=10&user`)
    if (levels.data)
        levels.data[0].results=pages.data[0]?.results||1

    res.status(levels.status).json(levels.data)
}

export default handle