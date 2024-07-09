
username= process.env.LT_USERNAME || "ihor.bezeka",
accessKey=  process.env.LT_ACCESS_KEY || "EaxeGHtAOKgDGJn4unvpTIo9UVib43mg3MXMHztSNP8M19lJ2E",

exports.config = {
  'specs': ['../specs/single.js'],

  seleniumAddress: 'https://'+ username +':'+ accessKey  +'@hub.lambdatest.com/wd/hub',

  'capabilities': {
    'build': 'protractor-LambdaTest-Single',
    'browserName': 'Safari',
    'version':'17',
    'platform': "macOS Sonoma",
    'video': true,
    'network': false,
    'console': false,
    'visual': false
  },
  onPrepare: () => {

    myReporter = {
        specStarted: function(result) {
          specStr= result.id
          spec_id = parseInt(specStr[specStr.length -1])
          browser.getProcessedConfig().then(function (config) {
            var fullName = config.specs[spec_id];
            //var fileName = fullName.substring(fullName.lastIndexOf('/')+1);
            browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
          });
        }
      };
      jasmine.getEnv().addReporter(myReporter);
  },
  onComplete: () => {
    browser.quit();
  }



};
