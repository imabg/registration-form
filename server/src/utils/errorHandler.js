const errorHandler = (err) => {
    return {
        success: false,
        code: err.code || 500,
        error: err.message,
    }
}

module.exports = errorHandler