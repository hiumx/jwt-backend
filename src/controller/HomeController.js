class HomeController {
    home(req, res) {
        res.send('Hello World');
    }
}

export default new HomeController;