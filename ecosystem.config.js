const config = () => {
  return {
    apps: [
      {
        name: 'atom-network',
        script: 'dist/apps/atom-network/apps/atom-network/src/main.js',
        interpreter: 'bun',
        exec_mode: 'cluster',
        instances: 1, // 'max',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z"',
      },
      {
        name: 'gateway',
        script: 'dist/apps/gateway/apps/gateway/src/main.js',
        interpreter: 'bun',
        exec_mode: 'cluster',
        instances: 1, // 'max',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z"',
      },
      {
        name: 'chefrigo',
        script: 'dist/apps/chefrigo/apps/chefrigo/src/main.js',
        interpreter: 'bun',
        exec_mode: 'cluster',
        instances: 1, // 'max',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z"',
      },
    ],
  };
};

module.exports = config();
