var ctxfolder = "/views/admin/CenterClasses";

var app = angular.module("App_ESEIM", ["ngRoute", "ngResource", "ui.bootstrap", "datatables"]);

//var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngCookies", "ngValidate", "datatables", "datatables.bootstrap", "pascalprecht.translate", "ngJsTree", "treeGrid", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', 'ui.select', 'ui.tinymce', 'dynamicNumber', 'ngTagsInput']);

app.controller("Ctrl_ESEIM", function ($scope, $rootScope) {





    $rootScope.studentData = {
        "id": 23,
        "name": "tiếng anh",
        "year": 2024,
        "grade": "3.1",
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



app.directive('outsideClick', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var clickHandler = function (event) {
                if (!element[0].contains(event.target)) {
                    scope.$apply(attr.outsideClick);
                }
            };

            $document.on('click', clickHandler);

            scope.$on('$destroy', function () {
                $document.off('click', clickHandler);
            });
        }
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: ctxfolder + '/index.html',
            controller: "index"
        })
        .when("/detail", {
            templateUrl: ctxfolder + '/detail.html',
            controller: "detail"
        })

        .when("/addClasses", {
            templateUrl: ctxfolder + '/addClasses.html',
            controller: "addClasses"
        })
        .when("/addGrades", {
            templateUrl: ctxfolder + '/addGrades.html',
            controller: "addGrades"
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
        DTColumnBuilder.newColumn('name').withTitle('Môn học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('year').withTitle('Năm học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('grade').withTitle('Tên lớp').renderWith(function (data, type) {
            return data;
        }),     
        DTColumnBuilder.newColumn('maxStudents').withTitle('Số lượng học viên').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('tuition').withTitle('Họp phí lớp').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('action').notSortable().withTitle('Các buổi học').renderWith(function (data, type, full, meta) {
            return '<button title="Chi tiết" ng-click="detail(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;" class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa-solid fa-eye"></i></button>';


        })
    ];

    vm.dtInstance = {};
    vm.dtOptions.data = [$rootScope.studentData];


    //$scope.response = {};
    // $http.get('http://localhost:3000/api/v1/student')
    //    .then(function (response) {
    //        $scope.response = response.data;
    //        vm.dtOptions.data = $scope.response.metadata;
    //    })
    //    .catch(function (error) {
    //        console.error('Error:', error);
    //    });


    $scope.detail = function (id) {
        console.log('Opening detail modal for student with id:', id);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ctxfolder + '/detail.html',
            controller: 'detail',
            backdrop: 'static',
            size: 'lg',

            resolve: {
                ClassesId: function () {
                    return id;
                }
            }
        });
        modalInstance.opened.then(function () {
            $('.modal').css({
                'display': 'block',
                'visibility': 'visible',
                'opacity': '1',
                'top': '34vh',
                'left': '17%'
            });
            $('.modal-content').css({
                'top': '23px !important'
            });
        });
        modalInstance.rendered.then(function () {
            var modalElement = angular.element(document.querySelector('.modal'));
            modalElement.addClass('modal-lg-detail');
        });

        modalInstance.result.then(function () {
            $scope.reload();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addClasses = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ctxfolder + '/addClasses.html',
            controller: 'addClasses',
            backdrop: 'static',
            size: 'lg',

        });
        modalInstance.opened.then(function () {

            $('.modal').addClass('fade in');
            $('.modal').css({
                'display': 'block',
                'visibility': 'visible',
                'opacity': '1',               
                'left': '23%',
                'overflow': 'hidden',
                 'overflow': 'visible'
            });
            var modalContentElement = angular.element(document.querySelector('.modal-content'));
            modalContentElement.attr('style', 'top: 23px !important', 'position: relative');
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



app.controller('detail', function ($scope, $uibModalInstance, $rootScope, $http, ClassesId, $compile, $uibModal, DTOptionsBuilder, DTColumnBuilder) {


    $http.post('http://localhost:3000/api/v1/student', ClassesId)
        .then(function (response) {

            vm.dtOptions.data = response;
            console.log('Response:', $scope.response);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });



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
        DTColumnBuilder.newColumn('id').withTitle('id').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('teacherId').withTitle('Giáo viên').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('topic').withTitle('Bài giảng').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('startDate').withTitle('Ngày dạy').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('startTime').withTitle('Thời gian bắt đầu').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('endTime').withTitle('Thời Gian kết thúc').renderWith(function (data, type) {
            return data;
        }),
    ];

    vm.dtInstance = {};
    vm.dtOptions.data = $rootScope.studentData.lessons;

    $scope.addGrades = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ctxfolder + '/addGrades.html',
            controller: 'addGrades',
            backdrop: 'static',
            size: 'lg',

        });
        modalInstance.opened.then(function () {
            $('.modal').css({
                'display': 'block',
                'visibility': 'visible',
                'opacity': '1',
                'left': '23%',
                'overflow': 'hidden'
            });
            $('.modal-content').css({
                'top': '23px !important'
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

app.controller('addClasses', function ($scope, $uibModalInstance, $rootScope, $compile, $uibModal, DTOptionsBuilder, DTColumnBuilder) {




    $scope.model = {   
        Grade:'',
        Name: '',
        Year: '',
        MaxStudent: '',    
        
    }


    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

app.controller('addGrades', function ($scope, $uibModalInstance, $rootScope, $compile, $uibModal, DTOptionsBuilder, DTColumnBuilder) {


    $scope.model = {
        classId:"",
        topic: "",
        teacherId: "",
        startDate:"",
        startTime:"",
        endTime: "",
    }


    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };



    $scope.selectedDate = null;
    $scope.format = 'yyyy/MM/dd';
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.startDate = {
        opened: false
    };

    $scope.openStartDate = function () {
        $scope.startDate.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };


    $scope.showStartTime = false;
    $scope.showEndTime = false;
    $scope.selectedTime = "";
    $scope.selectedHour = "00h";
    $scope.selectedMinute = "00";
    $scope.hours = [];
    $scope.minutes = [];

    // Populate hours array
    for (var i = 0; i < 24; i++) {
        var hour = (i < 10) ? "0" + i +"h" : "" + i + "h";
        $scope.hours.push(hour);
    }

    // Populate minutes array
    for (var j = 0; j < 60; j++) {
        var minute = (j < 10) ? "0" + j : "" + j;
        $scope.minutes.push(minute);
    }

    // Function to set selected time
    $scope.setEndTime = function () {
        $scope.model.endTime = $scope.selectedHour + ":" + $scope.selectedMinute;
        $scope.showEndTime = false;
    };

    $scope.setStartTime = function () {
        $scope.model.startTime = $scope.selectedHour + ":" + $scope.selectedMinute;
        $scope.showStartTime = false;
    };


    $scope.setCloseEndTime = function () {
        
        $scope.showEndTime = false;
        
    }
    $scope.setCloseStartTime = function () {

        $scope.showStartTime = false;

    }
});