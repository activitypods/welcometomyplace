module.exports = {
  apps: [
    {
      name: 'middleware',
      script: './node_modules/.bin/moleculer-runner',
      args: '--repl services importers/*.js',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
    },
  ],
};
