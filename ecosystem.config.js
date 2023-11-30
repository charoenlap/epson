module.exports = {
    apps : [{
        name: 'epson_web',
        script: 'node_modules/next/dist/bin/next',
        args: 'dev',
        autorestart: true,
    }],
    deploy : {
        production : {
            user : 'charoenlap',
            host : ['18.142.48.217'],
            ref  : 'origin/master',
            repo : 'git@github.com:charoenlap/epson.git',
            path : '/home/charoenlap/epson',
            'pre-deploy' : 'git fetch --all && git reset --hard && git clean  -d  -f .',
            'post-deploy' : 'pm2 startOrRestart ecosystem.config.js && pm2 save'
        },
    }
};

