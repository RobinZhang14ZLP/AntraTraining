

const API = (() => {
    const url = 'http://localhost:4232/courseList';

    const getCourse = () =>
        fetch(url).then((response) => response.json());

    return {
        getCourse,
    };
    })();

const View = (() => {})();

const Model = ((api, view) => {
    const {getCourse} = api;

    class Course {}

    class List{}

    return {
        getCourse,
        Course,
        List
    }
})(API, View);

const Controller = ((model, view) => {
    const init = () => {
        model.getCourse().then(res => {console.log(res);});
    };

    const bootstrap = () => {
        init();
    };

    return {
        bootstrap
    };
})(Model, View);

Controller.bootstrap();