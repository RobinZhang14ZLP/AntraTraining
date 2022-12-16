const View = (() => {})();

const Model = (() => {})(View);

const Controller = (() => {


    const bootstrap = () => {};

    return {
        bootstrap
    };
})(Model, View);

Controller.bootstrap();