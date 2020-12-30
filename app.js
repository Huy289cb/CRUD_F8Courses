// run json-server
// npx json-server --watch db.json
var courseApi = 'http://localhost:3000/courses';

function start() {

    getCourses(renderCourses);

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
        return htmlItem(course.image, course.name, course.description, course.author, course.like);
    }).join('');

    document.querySelector('#courses').innerHTML = html;
    

}

function htmlItem(image, name, description, author, like) {
    return `
            <div class="module_col module_1-2">
                <div class="course_item">
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
                    </div>
                </div>
            </div>
        `;
}