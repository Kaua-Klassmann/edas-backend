export default async (req, res, next) => {
    return res.status(401).json({error: "Invalid route."})
}