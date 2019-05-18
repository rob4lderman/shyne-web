var express = require('express');
var router = express.Router();

/* GET terms and conditions page. */
router.get('/', function(req, res, next) {
	res.render('terms', { 
        title: 'Terms and Conditions',
        app_name: 'Shyne',
        biz_name: 'Long Connections LLC',
    });
});

module.exports = router;
