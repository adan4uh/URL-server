import Url from "../models/urlModel.js";
import generateShortCode from "../utils/generateShortCode.js";

const createUrlController = async (req, res) => {
    try {
        let { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: 'URL is needed!'
            })
        }

        if (!originalUrl.startsWith("http://") &&
            !originalUrl.startsWith("https://")
        ) {
            originalUrl = `https://${originalUrl}`
        }

         if (!originalUrl.includes('.')) {
            return res.status(400).json({
                success: false,
                message: "URL is Invalid!"
            });
        }

        const shortUrlCode = generateShortCode();

        const newUrl = await Url.create({
            originalUrl,
            shortUrlCode
        })

        res.status(201).json({
            success: true,
            message: 'shortURL created!',
            shortUrl: `http://localhost:5000/${shortUrlCode}`,
            data: newUrl
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getUrlController = async (req, res) => {
    try {
        const { shortUrlCode } = req.params;
        const url = await Url.findOne({ shortUrlCode });

        if (!url) {
            return res.status(404).json({
                message: "URL not found",
            });
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { createUrlController, getUrlController };