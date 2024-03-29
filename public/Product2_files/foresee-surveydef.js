FSR.surveydefs = [{
    name: 'checkout',
    pin: '1',
    invite: false,
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    criteria: {
        sp: 2.5,
        lf: 1
    },
    include: {
        urls: ['/checkout/']
    },
    links: {
        attach: [{
            tag: 'button',
            attribute: 'name',
            patterns: ['unregistered_user'],
            sp: 40,
            when: 'later'
        }, {
            tag: 'button',
            attribute: 'name',
            patterns: ['registered_user_wo_billto'],
            sp: 40,
            when: 'later'
        }],
        cancel: [{
            tag: 'form',
            attribute: 'id',
            patterns: ['checkout_submit_order']
        }]
    }
}, {
    name: 'browse',
    lock: '1',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 0.25,
        lf: 5
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    exclude: {},
    
    ipexclude: 'fsr$ip',
    
    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.jpg\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
		<b><font size=\"3\">We\'d like your feedback.</b></font>\
		<br><br>Thank you for visiting our Kohls.com. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
		<br><br><b>The survey is designed to measure your entire site experience and will appear at the <u>end of your visit</u>.</b>\
		<br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',
        
        /*content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\">\
         <b><font size=\"3\">We\'d like your feedback.</b></font>\
         <br><br>Thank you for visiting our site. You have been randomly selected to participate in a customer satisfaction survey to let us know how we can improve your website experience.\
         <br><br><font size=\"1\">This survey is conducted by an independent company, ForeSee Results.</font><br></div></div></BODY></HTML>',
         */
        exclude: {
            local: ['/checkout/', 'error.jsp', 'error_404.jsp', '/radmin/', '/debug/'],
            referrer: []
        },
        include: {
            local: ['.']
        },
        
        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        timeout: 0,
        buttons: {
            accept: "Yes, I'll give feedback",
            decline: 'No thanks'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        hide: []
    },
    
    tracker: {
        width: '500',
        height: '350',
        timeout: 4,
        adjust: false,
        alert: {
            enabled: false,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600
    },
    
    qualifier: {
        width: '550',
        height: '425',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: false,
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802
        },
        pd: 7,
        custom: {
			purchase: {
               enabled: true,
               repeat: false,
               source: 'url',
               patterns: ['order_confirmation']
           }
       }
    },
    cpps: {
        numItems: { //this will be the name of the cpp
            source: 'variable',
            name: 'itemsQuantity' //the value sent will be the value of the parameter
        },
        orderAmt: {
            source: 'variable',
            name: 'orderAmt'
        },
		productID: { 
            source: 'variable',
            name: 'productId'
        }
    },
    pool: 100,
    
    previous: false,
    
    analytics: {
        google: false
    },
    
    mode: 'first-party'
};
