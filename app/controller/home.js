'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `<h1>${this.app.bot.logonoff()}</h1><img src="${this.app.bot.qrImgUrl}">`;
  }
}

module.exports = HomeController;
