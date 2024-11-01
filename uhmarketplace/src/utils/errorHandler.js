
const errorHandler = (err, req, res) => {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message }); // Send a generic error response
  };
  
export default errorHandler;
  