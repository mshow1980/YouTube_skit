const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://54.90.216.165:9000//',
       options : {
	    'sonar.projectDescription': 'This is a Node JS application',
	    'sonar.projectName': 'YouTube-Skit',
	    'sonar.projectKey':'YouTube-Skit',
	    'sonar.login': 'sqp_5276b0a69195eca3a042ed38899395f93f67a298',
	    //'sonar.login': 'YWRtaW4=',
	    //'sonar.password': 'Q29udHJvbDEw',
            'sonar.projectVersion':'1.0',
	    'sonar.language':'js',
            'sonar.sourceEncoding':'UTF-8',
            'sonar.sources': '.',
	  //'sonar.tests': 'specs',
          //'sonar.inclusions' : 'src/**'
       },
}, () => {});
