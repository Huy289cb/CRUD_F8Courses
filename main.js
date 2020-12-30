// run json-server
// npx json-server --watch db.json
var courseApi = 'http://localhost:3000/courses';

function start() {
    // getCourses(function(courses) {
    //     renderCourses(courses)
    // });
    getCourses(renderCourses);

    handleCreateForm();
}

start();


// Functions
function getCourses(callback) {
    fetch(courseApi)
        .then((response) => response.json())
        .then(callback);
}

function renderCourses(courses) {
    
    var html = courses.map(function(course) {
        return htmlItem(course.id ,course.image, course.name, course.description, course.author, course.like);
    }).join('');

    document.querySelector('#previewCourses').innerHTML = html;

}

function activeResetBtn() {
    const reset = document.querySelector('#reset');

    reset.onclick = function() {
        modalClose();
    }
}

function resetForm() {
    const name = document.querySelector('input[name="name"]');
    const description = document.querySelector('textarea[name="description"]');
    const image = document.querySelector('input[name="image"]');
    const author = document.querySelector('input[name="author"]');
    const like = document.querySelector('input[name="like"]');

    name.value = description.value = image.value = author.value = like.value = '';
    const addCourseBtn = document.querySelector('#addCourseBtn');
    addCourseBtn.innerText = 'Thêm';
}


function handleCreateForm() {
    activeResetBtn();
    const addCourseBtn = document.querySelector('#addCourseBtn');
    addCourseBtn.onclick = function() {
        const name = document.querySelector('input[name="name"]');
        const description = document.querySelector('textarea[name="description"]');
        const image = document.querySelector('input[name="image"]');
        const author = document.querySelector('input[name="author"]');
        const like = document.querySelector('input[name="like"]');

        var formData = {
            name: name.value,
            description: description.value,
            image: image.value,
            author: author.value,
            like: like.value
        }

        createCourse(formData, function(course) {
            
            // thêm phần tử mới vào sau
            var html = htmlItem(course.id ,image.value, name.value, description.value, author.value, like.value);

            document.querySelector('#previewCourses').append = html;

            resetForm();
            alert('Thêm thành công');
        })
    }
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then((response) => response.json())
        .then(callback);
}

function deleteCourse(id, callback) {
    var options = {
        method: 'DELETE'
    }
    fetch(courseApi + '/' + id, options)
        .then((response) => response.json())
        .then(callback);
}

function handleDeleteCourse(id) {
    const course_item = document.querySelector('.course_item--' + id);
    var curr_name = course_item.querySelector('.course_item__text>h6>a').innerText;
    var c = confirm('Khóa học: '+ curr_name +' sẽ bị xóa vĩnh viễn!');
    if(c) {
        deleteCourse(id, function() {});
    }

}

function updateCourse(id, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi + '/' + id, options)
        .then((response) => response.json())
        .then(callback);
}

function handleUpdateCourse(id) {

    //get value from DOM
    const course_item = document.querySelector('.course_item--' + id);
    var curr_image = course_item.querySelector('.course_item__image_wrapper>a>div').style.backgroundImage.slice(4, -1).replace(/["']/g, "");
    var curr_name = course_item.querySelector('.course_item__text>h6>a').innerText;
    var curr_description = course_item.querySelector('.course_item__text>p').innerText;
    var curr_author = course_item.querySelector('.course_item__author_link').innerText;
    var curr_like = course_item.querySelector('.course_item__register').innerText;
    
    // set value to control in Modal

    modalOpen();

    const name = document.querySelector('input[name="name"]');
    const description = document.querySelector('textarea[name="description"]');
    const image = document.querySelector('input[name="image"]');
    const author = document.querySelector('input[name="author"]');
    const like = document.querySelector('input[name="like"]');

    name.value = curr_name;
    description.value = curr_description;
    image.value = curr_image;
    author.value = curr_author;
    like.value = curr_like;

    // btnAddCourse --> btnUpdateCourse
    const updateCourseBtn = document.querySelector('#addCourseBtn');
    updateCourseBtn.innerText = 'Sửa';

    updateCourseBtn.onclick = function() {
        var formData = {
            name: name.value,
            description: description.value,
            image: image.value,
            author: author.value,
            like: like.value
        }
        updateCourse(id, formData, function(course) {
            
            // sửa lại element vừa được cập nhật
            // nhưng k hiểu sao chưa làm gì nó cũng vừa tự get lại lần nữa

            resetForm();
            alert('Bạn vừa cập nhật khóa học: '+ formData.name);
        })
    }
}

function htmlItem(id ,image, name, description, author, like) {
    return `
            <div class="module_col module_1-3">
                <div class="course_item course_item--${id}">
                    <div class="course_item__image_wrapper">
                        <a href="">
                            <div class="course_item__image" style="background-image: url(${image});"></div>
                        </a>
                    </div>
                    <div class="course_item__text">
                        <h6>
                            <a href="">${name}</a>
                        </h6>
                        <p>${description}</p>
                        <ul class="course_item_info">
                            <li class="course_item__author">
                                <a href="" class="course_item__author_link">
                                    <img src="https://avatar-redirect.appspot.com/google/109023826614717592641?size=400" alt="Huy">
                                    ${author}
                                </a>
                            </li>
                            <li class="course_item__register">
                                <i class="fas fa-heart"></i>
                                ${like}
                            </li>
                            <li>
                                <a href="" class="course_item__joinBtn course_item__free">
                                    Miễn phí
                                </a>    
                            </li>
                        </ul>
                        <div class="handle_course">
                            <button onclick=handleUpdateCourse(${id}) class="btn btnUpdate">Sửa</button>
                            <button onclick=handleDeleteCourse(${id}) class="btn btndelete">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
}