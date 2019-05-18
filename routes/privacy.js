var express = require('express');
var router = express.Router();

/* GET privacy page. */
router.get('/', function(req, res, next) {
	res.render('privacy', { 
        title: 'Privacy Policy',
        app_name: 'Shyne',
        biz_name: 'Long Connections LLC',
        contact_email: 'info@shynemoney.com',
    });
});

module.exports = router;
