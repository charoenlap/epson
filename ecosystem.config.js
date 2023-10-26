module.exports = {
    apps : [{
        name: 'epson_web',
        autorestart: true,
    }],
    deploy : {
        production : {
            user : 'charoenlap',
            host : ['54.179.4.127'],
            ref  : 'origin/master',
            repo : 'charoenlap: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@github.com/charoenlap/epson.git',
            path : '/home/charoenlap/epson',
            'pre-deploy' : 'git fetch --all && git reset --hard && git clean  -d  -f .',
            'post-deploy' : 'npm install --legacy-peer-deps && npm run build && pm2 startOrRestart ecosystem.config.js && pm2 save'
        },
    }
};

