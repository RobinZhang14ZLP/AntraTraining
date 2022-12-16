

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
        selected: ".selected-list",
        button: "form",
        credit: ".credit-number"
    };

    let selectCourse = [];

    const createTmp = (arr) => {
        let tmp = '';
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let type = "Elective";
            let color = "odd-child";
            if (i%2 === 0) color = "even-child";
            if (element.required) type = "Compulsory";
            tmp += `
                <li class="${color}" id="${element.courseId}">
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

    const bindSelection = (handler) => {
        const courses = document.querySelector(domstr.available);

        courses.addEventListener("click", event => {
            const li = event.target.parentElement;
            if (li.nodeName !== "UL") {
                li.classList.toggle("selected-child")
                if (li.select === "1") li.select = "0";
                else li.select = "1";
                handler(li);}
        });
    };

    const decline = (li) => {
        li.classList.toggle("selected-child")
    };

    const bindSubmit = (handler) => {
        const button = document.querySelector(domstr.button);
        const credit = document.querySelector(domstr.credit);

        button.addEventListener('submit', event => {
            event.preventDefault();
            handler(credit.innerHTML, selectCourse);
        });
    };

    return {
        domstr,
        createTmp,
        render,
        bindSelection,
        decline,
        bindSubmit
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
    const available = new model.List(false);
    const selected = new model.List(true);
    let tempSelect = [];
    let selectCredit = 0;

    const init = () => {
        model.getCourse().then(res => {
            available.courses = res;
        });
    };

    const addSelection = () => {
        view.bindSelection((li) => {
            id = li.id;
            add = li.select;
            const credit = available.courses.filter(course => course.courseId == id)[0].credit;
            if (add === '1') {
                tempSelect.push(id);
                selectCredit += credit;
                if (selectCredit >= 18 ) {
                    selectCredit -= credit;
                    alert("You cannot choose for more than 17 credits. ");
                    view.decline(li);
                }
                else if (selected.courses.map(course => course.courseId.toString()).includes(li.id)) {
                    selectCredit -= credit;
                    alert("You have selected the course. ");
                    view.decline(li);
                }
            }
            else {
                tempSelect = tempSelect.filter(num => num !== id);
                selectCredit -= credit;
            }
            
            document.querySelector(view.domstr.credit).innerHTML = selectCredit;
        });
    };

    const submitToSelected = () => {
        view.bindSubmit((credit) => {
            if (credit < 18) {
                confirm("You have choose "+credit+" credits, do you want to confirm?")
                const submitCourses = available.courses.filter(course => tempSelect.includes(course.courseId.toString()));
                selected.courses = submitCourses;
                available.courses = available.courses;
            }
        });
    };

    const bootstrap = () => {
        init();
        addSelection();
        submitToSelected();
    };

    return {
        bootstrap
    };
})(Model, View);

Controller.bootstrap();