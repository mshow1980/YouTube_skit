const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://3.239.207.235:9000/',
       options : {
	    'sonar.projectDescription': 'This is a Node JS application',
	    'sonar.projectName': 'YouTube-Skit',
	    'sonar.projectKey':'YouTube-Skit',
	    //'sonar.login': 'sqa_a654c537d1897464294c8b64eacbdc0914fc003d',
	    'sonar.login': 'YWRtaW4=',
	    'sonar.password': 'YWRtaW4=',
            'sonar.projectVersion':'1.0',
	    'sonar.language':'js',
            'sonar.sourceEncoding':'UTF-8',
            'sonar.sources': '.',
	  //'sonar.tests': 'specs',
          //'sonar.inclusions' : 'src/**'
       },
}, () => {});
