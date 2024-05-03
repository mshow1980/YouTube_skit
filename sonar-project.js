const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://34.203.33.53:9000//',
       options : {
	    'sonar.projectDescription': 'This is a Node JS application',
	    'sonar.projectName': 'YouTube-Skit',
	    'sonar.projectKey':'YouTube-Skit',
	    //'sonar.login': ',
	    'sonar.login': 'YWRtaW4=',
	    'sonar.password': 'YWRtaW4=',
            'sonar.projectVersion':'1.0',
	    'sonar.language':'js',
            //'sonar.sourceEncoding':'UTF-8',
            'sonar.sources': '.',
	  //'sonar.tests': 'specs',
          'sonar.inclusions' : 'src/**'
       },
}, () => {});
