// script.js
AWS.config.region = 'us-east-1'; // e.g., us-east-1
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:bf7431ca-b0b9-498e-a78a-eb10058fd5e7'
});


var cognitoUser;

function login() {
    var authenticationData = {
        Username: document.getElementById('username').value,
        Password: document.getElementById('password').value
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = {
        UserPoolId: 'us-east-1_TFtdMCMms',
        ClientId: '272svkoe8nct9hvavscvovltn'
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: authenticationData.Username,
        Pool: userPool
    };

    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            console.log('Authentication successful');
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('homePage').style.display = 'block';
        },
        onFailure: function(err) {
            console.log('Authentication failed');
            alert(err);
        }
    });
}

function uploadFile() {
    var file = document.getElementById('fileInput').files[0];
    var fileName = file.name;
    var bucketName = 'source205';

    var params = {
        Key: fileName,
        Body: file,
        Bucket: bucketName
    };

    var s3 = new AWS.S3();
    s3.upload(params, function(err, data) {
        if (err) {
            console.log('Error uploading file: ', err);
            return;
        }
        console.log('File uploaded successfully');
    });
}

function generateTranscription() {
    // Call API Gateway endpoint or trigger Lambda directly to start transcription process
}

// Function to download PDF or text file from 'target205' bucket
// You would need to implement this based on your specific requirements.
