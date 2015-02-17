/* globals console */
'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;
var backendPort = ':8080';

var develop = false;
process.argv.forEach(function(arg) {
  develop = develop || arg === '--develop';
});

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getAppLibraryPath() {
  return getUserHome() + '/Library/recipe-organizer';
}

if (!develop) {
  var fs = require('fs');
  try {
    fs.mkdirSync(getAppLibraryPath());
  } catch (e) {
    console.log('already exists');
  }

  var exec = require('child_process').exec;
  var appPath = process.resourcesPath + '/app';
  var child = exec(appPath + '/serve -sr27.database=' + appPath + '/sr27.db -user.database=' + getAppLibraryPath() + '/user.db');

  child.stdout.on('data', function(data) {
    backendPort = data;
    console.log('go: ' + data);
  });

  child.stderr.on('data', function(data) {
    if (backendPort === null) {
      backendPort = data.split('Listening on')[1].trim();
    }
    console.log('go.err: ' + data);
  });

  child.on('close', function(code) {
    console.log('go stopped:' + code);
  });

  app.on('will-quit', function() {
    child.kill('SIGQUIT');
  });
}

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1024,
    title: 'Food Plan Organizer',
    height: 786,
    'web-preferences': {
      'web-security': false
    }
  });

  var backendParam = '?backend=' + backendPort;
  if (develop) {
    mainWindow.loadUrl('http://localhost:9000/index.html' + backendParam);
  } else {
    mainWindow.loadUrl('file://' + process.resourcesPath + '/app/index.html' + backendParam);
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});