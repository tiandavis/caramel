#Caramel
## A responsive email framework
Caramel is a responsive email framework built with [Salted](https://github.com/rodriguezcommaj/salted) on top of [Harp](http://harpjs.com/). 

Building HTML emails may be old school, but your workflow doesn't have to be. Harp static website generator is builtin so you can take advantage of base layouts, semantic templates and testing. 

Integrate CSS extensions like Sass or LESS to craft more robust CSS. Simply change the file extensions from `stylesheets\*.scss` to `stylesheets\*.less` Automate common tasks like compiling CSS preprocessors to CSS, CSS inlining and pushing to email service providers like Mandrill.

Caramel does the following for you:

1. Compiles your SCSS to CSS (or LESS to CSS)

2. Builds your Responsive HTML email templates

3. Inlines your CSS

4. Uploads your email templates to Mandrill (optional)


##Running Caramel
Get a Mandrill API Key (it's free) to play around. Then update go to `gulpfile.js`:

```
var mandrill_client = new mandrill.Mandrill('MANDRILL-API-KEY');
```

Then update `MANDRILL-API-KEY` to your Mandrill account. Then:

```
gem install premailer
npm install
gulp
open http://localhost:9000/src/salted
```

To see on your mobile device, do something like:

```
open my-computer-name.local:9000/src/salted
```

##Emails
The responsive HTML emails are in the `src` folder. Text versions of each email are found in `src\_data.json`. Each HTML email should have a corresponding text version.


##Push To Mandrill
Then run this `gulp` task:

```
gulp esp

```

That's it. Your HTML templates are now on Mandrill.