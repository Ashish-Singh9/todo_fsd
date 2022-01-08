module.exports = function(req, res, next)
{

  if(req.session.is_logged_in)
  {

    next();
      
  }
  else
  {
    res.redirect("/signin");
  }

}