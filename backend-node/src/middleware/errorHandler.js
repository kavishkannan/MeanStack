export function errorHandler(err, req, res, next) {
    console.error("Error:", err);
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
    });
}
