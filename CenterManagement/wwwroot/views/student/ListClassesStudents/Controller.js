var ctxfolder = "/views/student/ListClassesStudents";

var app = angular.module("App_ESEIM", ["ngRoute", "ngResource", "ui.bootstrap", "datatables"]);

//var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngCookies", "ngValidate", "datatables", "datatables.bootstrap", "pascalprecht.translate", "ngJsTree", "treeGrid", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', 'ui.select', 'ui.tinymce', 'dynamicNumber', 'ngTagsInput']);

app.controller("Ctrl_ESEIM", function ($scope, $rootScope) {





    $rootScope.studentData = {
        "id":23,
        "name": "3.1",
        "year": 2024,
        "grade": 3,
        "lessons": [
            {
                "date": "2024-05-29",
                "topic": "Introduction to Algebra",
                "teacherId": "66640f7ccf0f68d1c98dad85"
            },
            {
                "date": "2024-05-30",
                "topic": "Linear Equations",
                "teacherId": "66640f7ccf0f68d1c98dad85"
            },
            {
                "date": "2024-06-01",
                "topic": "Statistics",
                "teacherId": "66640f7ccf0f68d1c98dad85"
            }
        ]
    };




});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: ctxfolder + '/index.html',
            controller: "index"
        })
        .otherwise({
            redirectTo: "/"
        });


});


app.controller('index', function ($scope, $compile, $rootScope, $http, $uibModal, DTOptionsBuilder, DTColumnBuilder) {



    





    vm = $scope;
    vm.dtOptions = DTOptionsBuilder.newOptions()


        //.withOption('ajax', {
        //    url: 'your-api-endpoint', // URL của API của bạn
        //    type: 'GET', // Loại yêu cầu (GET hoặc POST)
        //    dataSrc: 'data' // Tên thuộc tính trong phản hồi API chứa dữ liệu
        //})
        //.withDataProp('data') // Cách cũ để chỉ định thuộc tính dữ liệu


        
        .withPaginationType('full_numbers')
        .withDisplayLength(9)
        .withOption('autoWidth', false)
        .withOption('processing', true)
        .withOption('lengthChange', false)
        .withOption('searching', false)
        .withOption('scrollX', false)
        .withOption('pageLength', 10)
        .withOption('scrollCollapse', true)
        //tự điều chỉnh độ rộng của cột khớp màn hình
        .withLanguage({
            "info": "_END_ / _TOTAL_ mục",
            "paginate": {
                "first": '<<',
                "last": '>>',
                "next": 'tiếp',
                "previous": 'trước'
            },
            "lengthMenu": "Hiển thị _MENU_ mục",
            "search": "Tìm kiếm:",
            "infoEmpty": "Không có dữ liệu",
            "infoFiltered": "(lọc từ _MAX_ mục)",
            "zeroRecords": "Không tìm thấy dữ liệu"
        })


        
        /*.withOption('scrollX', false)*/
        /*  .withOption('serverSide', true)*/
        .withOption('columnDefs', [
            { targets: 0, visible: false },  // Ẩn cột đầu tiên          
        ])
        .withOption('createdRow', function (row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        });

    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('subject').withTitle('Môn học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('year').withTitle('Năm học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('grade').withTitle('Lớp').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('totalLesson').withTitle('Tổng số buổi học').renderWith(function (data, type) {
            return data;
        }),       
        DTColumnBuilder.newColumn('learned').withTitle('Số buổi đã dạy').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('skipClass').withTitle('Đã nghỉ').renderWith(function (data, type) {
            return `<span  class="text-danger">` + data +`</span>`;
        }),
 
    ];

    vm.dtInstance = {};

    vm.dtOptions.data = [
        { Id: 1, subject: 'Listening', year: '2000', totalLesson: 15, learned: 2, grade: 'Grade 1', skipClass :1},
        { Id: 2, subject: 'reading', year: '2000', totalLesson: 14, learned: 4, grade: 'Grade 2', skipClass:2 },
        { Id: 3, subject: 'wishtkjths', year: '2000', totalLesson: 17, learned: 7, grade: 'Grade 3', skipClass :2}
    ];
    /*vm.dtOptions.data = $rootScope.studentData;*/


    //$scope.response = {};
    // $http.get('http://localhost:3000/api/v1/student')
    //    .then(function (response) {
    //        $scope.response = response.data;
    //        vm.dtOptions.data = $scope.response.metadata;
    //    })
    //    .catch(function (error) {
    //        console.error('Error:', error);
    //    });


    $scope.detail = function (Id) {
        console.log('Opening detail modal for student with id:', Id);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ctxfolder + '/detail.html',
            controller: 'detail',
            backdrop: 'static',
            size: 'lg',

            resolve: {
                studentId: function () {
                    return Id;
                }
            }
        });
        modalInstance.opened.then(function () {
            $('.modal').css({
                'display': 'block',
                'visibility': 'visible',
                'opacity': '1',
                'top': '30vh',
                'left': '23%'
            });
        });
        modalInstance.rendered.then(function () {
            var modalElement = angular.element(document.querySelector('.modal'));
            modalElement.addClass('modal-lg');
        });

        modalInstance.result.then(function () {
            $scope.reload();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

 



});



app.controller('detail', function ($scope, $uibModalInstance, $rootScope,studentId, $compile, $uibModal, DTOptionsBuilder, DTColumnBuilder) {

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };




    vm = $scope;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(9)
        .withOption('autoWidth', false)
        .withOption('processing', true)
        .withOption('lengthChange', false)
        .withOption('searching', false)
        .withOption('scrollX', false)
        .withOption('pageLength', 10)
        .withOption('scrollCollapse', true)
        //tự điều chỉnh độ rộng của cột khớp màn hình
        .withLanguage({
            "info": "_END_ / _TOTAL_ mục",
            "paginate": {
                "first": '<<',
                "last": '>>',
                "next": 'tiếp',
                "previous": 'trước'
            },
            "lengthMenu": "Hiển thị _MENU_ mục",
            "search": "Tìm kiếm:",
            "infoEmpty": "Không có dữ liệu",
            "infoFiltered": "(lọc từ _MAX_ mục)",
            "zeroRecords": "Không tìm thấy dữ liệu"
        })

        /*.withOption('scrollX', false)*/
        /*  .withOption('serverSide', true)*/
        .withOption('columnDefs', [
            { targets: 0, visible: false },  // Ẩn cột đầu tiên          
        ])
        .withOption('createdRow', function (row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        });

    vm.dtColumns = [
        DTColumnBuilder.newColumn('Id').withTitle('ID').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('date').withTitle('Thời gian').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('topic').withTitle('Bài giảng').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('teacherID').withTitle('Giáo viên').renderWith(function (data, type) {
            return data;
        }),

    ];

    vm.dtInstance = {};
    vm.dtOptions.data = $rootScope.studentData.lessons;

});





