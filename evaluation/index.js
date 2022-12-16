

const API = (() => {
    const url = 'http://localhost:4232/courseList';

    const getCourse = () =>
        fetch(url).then((response) => response.json());

    return {
        getCourse,
    };
    })();

const View = (() => {
    const domstr = {
        available: ".available-list",
        selected: ".selected-list"
    };

    const createTmp = (arr) => {
        let tmp = '';
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let type = "Elective";
            let color = "odd-child";
            if (i%2 === 0) color = "even-child";
            if (element.required) type = "Compulsory";
            tmp += `
                <li class="${color}">
                    <p>${element.courseName}</p>
                    <p>Course Type: ${type}</p>
                    <p>Course Credit: ${element.credit}</p>
                </li>
            `;
        }

        return tmp;
    };

    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };

    return {
        domstr,
        createTmp,
        render
    }
})();

const Model = ((api, view) => {
    const {getCourse} = api;

    class Course {
        constructor(name, type, credit, id) {
            this.courseName = name;
            this.required = type;
            this.credit = credit;
            this.courseId = id;
        }
    }

    class List{
        #courses = [];
        #type = "";

        constructor(isSelected) {
            this.#type = view.domstr.available;
            if (isSelected) this.#type = view.domstr.selected;
        }

        get courses() {
            return this.#courses;
        };

        set courses(newList) {
            this.#courses = newList;
            console.log(this.#courses);
            const container = document.querySelector(this.#type);

            const tmp = view.createTmp(this.#courses);
            view.render(container, tmp);
        };
    }

    return {
        getCourse,
        Course,
        List
    }
})(API, View);

const Controller = ((model, view) => {
    const available = new model.List();

    const init = () => {
        model.getCourse().then(res => {
            // console.log(res);
            available.courses = res;
        });
    };

    const bootstrap = () => {
        init();
    };

    return {
        bootstrap
    };
})(Model, View);

Controller.bootstrap();