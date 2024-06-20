var ctxfolder = "/views/admin/CenterTeacher";

var app = angular.module("App_ESEIM", ["ngRoute", "ngResource", "ui.bootstrap", "datatables"]);

//var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngCookies", "ngValidate", "datatables", "datatables.bootstrap", "pascalprecht.translate", "ngJsTree", "treeGrid", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', 'ui.select', 'ui.tinymce', 'dynamicNumber', 'ngTagsInput']);

app.controller("Ctrl_ESEIM", function ($scope, $rootScope) {


    $rootScope.studentData = [
        { id: 1, subject: 'tiếng anh', year: '2024', grade: "3.1", maxStudents: 70, registerStudent: 30, tuition: 20000000, statusClasses: "Mở đăng ký" },
        { id: 2, subject: 'tiếng anh', year: '2024', grade: "3.1", maxStudents: 70, registerStudent: 30, tuition: 70000000, statusClasses: "Đóng đăng ký" },
        { id: 3, subject: 'tiếng anh', year: '2024', grade: "3.1", maxStudents: 70, registerStudent: 30, tuition: 90000000, statusClasses: "Lớp học kết thúc" }
    ]




    $rootScope.gradeData = [
        { id: 1, teacherId: 'Nguyễn Văn Hưng', topic: '2024', grade: "3.1", startDate: "23/7/2024", startTime: "7h00", endTime: "10h30" },
        { id: 2, teacherId: 'Vữ Công Hậu', topic: '2024', grade: "3.1", startDate: "28/7/2024", startTime: "7h00", endTime: "10h30" },
        { id: 3, teacherId: 'Đăng Minh Phương', topic: '2024', grade: "3.1", startDate: "31/7/2024", startTime: "7h00", endTime: "10h30" }
    ]

});

app.factory('dataservice', function ($http) {
    $http.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    var headers = {
        "Content-Type": "application/json;odata=verbose",
        "Accept": "application/json;odata=verbose",
    }
    var submitFormUpload = function (url, data, callback) {
        var req = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': undefined
            },
            beforeSend: function () {
                App.blockUI({
                    target: "#modal-body",
                    boxed: true,
                    message: 'loading...'
                });
            },
            complete: function () {
                App.unblockUI("#modal-body");
            },
            data: data
        }
        $http(req).success(callback);
    };
    return {
        addClasses: function (data, callback) {
            $http.post('link/api', data).success(callback);
        },
        addGrades: function (data, callback) {
            $http.post('//', data).success(callback);
        },
        close: function (data, callback) {
            $http.post('//', data).success(callback);
        },
        delete: function (data, callback) {
            $http.post('//', data).success(callback);
        },
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

        .withPaginationType('full_numbers')
        .withDisplayLength(9)
        .withOption('order', [0, 'desc'])
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
        DTColumnBuilder.newColumn('Name').withTitle('Tên giảng viên').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('Addresses').withTitle('Địa chỉ').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('Email').withTitle('Email').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('maxStudents').withTitle('Học Viên tối đa').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('tuition').withTitle('Học phí lớp').renderWith(function (data, type) {
            return data + "đ";
        }),
        DTColumnBuilder.newColumn('action').notSortable().withTitle('Thao tác').renderWith(function (data, type, full, meta) {
            if (full.statusClasses == "Mở đăng ký") {
                return '<button title="Các buổi học" ng-click="detail(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #3d9afb;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa-solid fa-eye"></i></button>' +
                    '<button title="Đóng đăng ký" ng-click="lock(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #ff6000;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa-solid fa-key"></i></button>' +
                    '<button title="Xóa" ng-click="delete(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #fe0000;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa fa-trash"></i></button>';
            }
            else if (full.statusClasses == "Đóng đăng ký") {
                return '<button title="Các buổi học" ng-click="detail(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #3d9afb;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa-solid fa-eye"></i></button>' +
                    '<button title="Mở đăng ký" ng-click="lock(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #47b35b;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa-solid fa-unlock-keyhole"></i></button>' +
                    '<button title="Xóa" ng-click="delete(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #fe0000;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa fa-trash"></i></button>';
            }
            else
                return '<button title="Các buổi học" ng-click="detail(' + full.Id + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;margin-right: 7px;color: white;background: #3d9afb;padding-top: 1px; " class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="fa-solid fa-eye"></i></button>';

        })
    ];

    vm.dtInstance = {};
    vm.dtOptions.data = $rootScope.studentData;


    //$scope.response = {};
    // $http.get('http://localhost:3000/api/v1/student')
    //    .then(function (response) {
    //        $scope.response = response.data;
    //        vm.dtOptions.data = $scope.response.metadata;
    //    })
    //    .catch(function (error) {
    //        console.error('Error:', error);
    //    });

    $scope.delete = function (id) {
        var modalInstance = $uibModal.open({
            templateUrl: ctxfolderMessage + '/messageConfirmDeleted.html',
            windowClass: "message-center",
            controller: function ($scope, $uibModalInstance) {
                $scope.message = "Bạn có chắc chắn muốn xóa ?";
                $scope.ok = function () {
                    dataservice.delete(id, function (rs) {
                        if (rs.Error) {
                            App.toastrError(rs.Title);
                        } else {
                            App.toastrSuccess(rs.Title);
                            $uibModalInstance.close();
                        }
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            size: '25',
        });
        modalInstance.result.then(function (d) {
            $scope.reloadNoResetPage();
        }, function () {
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