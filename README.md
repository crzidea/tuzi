tuzi
====

A fast and lightweight non-MVC framework.

## Q & A

 * Why is it so FAST and light than any other frameworks?

   The most common use-case of `tuzi` is just writing/serving static
   pages. Every thing on the server should be **LOGIC-LESS**. 
   Everything logic should be compiled to static files before uploading
   to the production (nginx) **OR** after browser loading pages.

 * Why is it not MVC based?

   Everybody likes RESTful development nowadays, right? So it's time to
   drop MVC and start a new life. You can use angular or **something else**
   (XHR/XDR/JSONP/*WebSocket*) to fetch data from other servers.

 * Is it really a FRAMEWORK?

   `tuzi` is just like `express`. It is showing you a way to develop and
   manage your code/logic. I'm not really sure whether it should be called
   "F-R-A-M-E-W-O-R-K" but it should be helpful for our development.
 
 * Where is your/my test?

   It should be in `test/` if there was.
