import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";


const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { user, page } = req.query
    try {
        let pages = await axios.get(`https://gdbrowser.com/api/search/${user}?page=0&count=1&user`)
        let levels = await axios.get(`https://gdbrowser.com/api/search/${user}?page=${page}&count=10&user`)
        if (levels.data)
            levels.data[0].results=pages.data[0]?.results||1

        res.status(levels.status).json(levels.data)
    } catch (e) {
        res.status(204).json([])
    }
}

export default handle