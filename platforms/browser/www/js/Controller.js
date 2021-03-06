var Controller = function() {
    var controller = {
        self: null,
        initialize: function() {
			self = this;
            this.bindEvents();
			self.pwsPost(); 
            self.headerClick();
        },

        bindEvents: function() {
            $('.tab-button').on('click', this.onTabClick);
	    },

        onTabClick: function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                return;
            }
            
            var tab = $(this).data('tab');
            if (tab === '#loginpwd') {
                self.pwsPost();
				
            } else {
                self.otpPost();
            }
        },

        otpPost: function() {
            $('.tab-button').removeClass('active');
			$('#login-otp-id').addClass('active');
            var $tab = $('#tab-content');
            $tab.empty();
            $("#tab-content").load("./views/loginviaotp.html", function(data) {
			   $('#tab-content').find('#submit-loginotp').click('submit', self.onLoginOtp);
            });
        },
       
        pwsPost: function() {
           $('.tab-button').removeClass('active');
           $('#login-password-id').addClass('active');

            var $tab = $('#tab-content');
            $tab.empty();
			
            var $projectTemplate = null;
            $("#tab-content").load("./views/loginviapwd.html", function(data) {
			    $('#tab-content').find('#submit-loginpwd').click('submit', self.onLoginPwd);
            }); 
        },

		onLoginPwd: function(e) {
			e.preventDefault();
			var uid= $('#uid').val();
			var	pwd =$('#pwd').val();
			$.ajax({
				dataType: 'json',
				crossDomain: true,
				type: "GET",
				url: "auth.json",
				data: { uid: uid, pwd: pwd} ,
				success: function(data){
					$("#container-data").load("./views/dashboard.html" , function(data) {
						$('#myTopnav').on('click',self.headerClick);
						$('#grid-dashboard').on('click',self.gridClick);
					});
				},error: function (jqXHR, textStatus, errorThrown) {
					alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
				}
			 });
		},
		onLoginOtp: function(e) {
			e.preventDefault();
			var uid= $('#uid').val();
			var	uid_otp =$('#uid_otp').val();
			$.ajax({
				dataType: 'json',
				crossDomain: true,
				type: "GET",
				url: "auth.json",
				data: { uid: uid, otp: uid_otp} ,
				success: function(data){
					$("#container-data").load("./views/dashboard.html" , function(data) {
						$('#myTopnav').on('click',self.headerClick);
						$('#grid-dashboard').on('click',self.gridClick);
					});
				},error: function (jqXHR, textStatus, errorThrown) {
					alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
				}
			 });
		},

		headerClick:  function(e) {
			e.preventDefault();
			var clickedURL = $(this).find("a").attr('href').split('=');
			alert(clickedURL);
			if(clickedURL='home'){
				$("#container-data").load("./views/dashboard.html");
			}else if(clickedURL='help'){
				$("#container-data").load("./views/help.html");
			}else if(clickedURL='changePwd'){
				$("#container-data").load("./views/changepwd.html");
			}else if(clickedURL='myProfile'){
				$("#container-data").load("./views/myProfile.html");
			}else if(clickedURL='notifications'){
				$("#container-data").load("./views/notifications.html");
			}
		},

		gridClick: function(e) {
			e.preventDefault();
			var clickedImg = $(this).find("img").attr('id');
			if(clickedURL='announcement'){
				$("#grid-dashboard").load("./views/news.html");
			}else if(clickedURL='help'){
				$("#container-data").load("./views/help.html");
			}else if(clickedURL='call-tree'){
				$("#grid-dashboard").load("./views/news.html");
			}else if(clickedURL='chat'){
				$("#container-data").load("./views/help.html");
			}else if(clickedURL='globe'){
				$("#grid-dashboard").load("./views/news.html");
			}else if(clickedURL='info'){
				$("#container-data").load("./views/news.html");
			}else if(clickedURL='network'){
				$("#container-data").load("./views/news.html");
			}else if(clickedURL='like'){
				$("#container-data").load("./views/news.html");
			}else if(clickedURL='social'){
				$("#container-data").load("./views/news.html");
			}
		}
    }
    controller.initialize();
    return controller;
}