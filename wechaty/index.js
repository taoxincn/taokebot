const { Wechaty } = require('wechaty');
const { ScanStatus } = require('wechaty-puppet');
const { PuppetPadplus } = require('wechaty-puppet-padplus');
const token = 'puppet_padplus_xxxxxxxxxxxxxxxxx';
const name = 'bot';
const puppet = new PuppetPadplus({ token });

module.exports = app => {
    app.bot = new Wechaty({ puppet, name });

    //const bot=new Wechaty({ puppet, name });
    //bot.reset()

    app.bot.on("scan", onScan).on("login", onLogin).on("logout", onLogout).on("message", onMessage).on("error", onError);
    app.bot.start().catch(async e => {
        console.log('Bot init fail:' + e)
        await bot.stop()
    });

    async function onScan(qrcode, status) {
        console.info('[onScan] qrcode:', qrcode, 'status:', status);
        if (status === ScanStatus.Waiting) {
            app.bot.qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`;
        }
    }

    async function onLogin(user) {
        console.info(`[onLogin] ${user.name()} login`)
    }

    async function onLogout(user) {
        console.info(`[onLogout] ${user.name()} logout`)
        app.bot.reset();
    }

    async function onMessage(msg) {
        //console.log('[onMessage] msg:', msg);
        //console.log('[onMessage] msg.from:', msg.from());//来自
        //console.log('[onMessage] msg.text:', msg.text());//消息
        //console.log('[onMessage] msg.room:', msg.room());//消息相关群信息
        //await msg.say('ding');
    }

    async function onError(err) {
        console.error('[onError] err:', err);
    }
};

