var ctxfolder = "/views/Parents/ParentsSonClasses";


var app = angular.module("App_ESEIM", ["ngRoute", "ngResource", "ui.bootstrap", "datatables"]);

//var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngCookies", "ngValidate", "datatables", "datatables.bootstrap", "pascalprecht.translate", "ngJsTree", "treeGrid", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', 'ui.select', 'ui.tinymce', 'dynamicNumber', 'ngTagsInput']);

app.controller("Ctrl_ESEIM", function ($scope) {

    $scope.hung = "nsjbsjkdf";

});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: ctxfolder + '/index.html',
            controller: "index"
        })
        .when('/detail', {
            templateUrl: ctxfolder + '/detail.html',
            controller: 'detail'
        })
        //.otherwise({
        //    redirectTo: "/"
        //});



});




app.controller('index', function ($scope,$compile,$rootScope, $http, $timeout, $uibModal, DTOptionsBuilder, DTColumnBuilder ) {
   


    $scope.detail = function (Id) {
        console.log('Opening detail modal for student with id:', Id);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ctxfolder + '/detail.html',
            controller: 'detail',
            backdrop: 'static',
            size: '60',
       
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
                'opacity': '1'
            });
        });


        modalInstance.result.then(function () {
            $scope.reload();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
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
        DTColumnBuilder.newColumn('id').withTitle('ID').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('subject').withTitle('Môn học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('year').withTitle('Năm học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('classes').withTitle('Lớp').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('teacher').withTitle('Giảng viên chính').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('totalLesson').withTitle('Tổng số buổi học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('learned').withTitle('Đã học').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn('skipClass').withTitle('Đã nghỉ').renderWith(function (data, type) {
            return `<span  class="text-danger">` + data + `</span>`;
        }),
        DTColumnBuilder.newColumn('tuition').withTitle('Học phí').renderWith(function (data, type) {
            return data + "đ";
        }),
        DTColumnBuilder.newColumn('tuitionUnpaid').withTitle('Còn phải đóng').renderWith(function (data, type) {
            return `<span  class="text-danger">` + data + `</span>`;
        }),
        DTColumnBuilder.newColumn('action').notSortable().withTitle().renderWith(function (data, type, full, meta) {
            if (full.tuitionUnpaid || full.tuitionUnpaid != 0)
            return ' <button type="button"  ng-click="pay(' + full.Id + ')" class="btn btn-gradient-danger btn-icon-text click-button" style="height: 30px; padding-left: 17px; padding-right: 17px;background: #ff6300;align-items: center;display:flex;">Thanh toán</button > ';
        }),

    ];

    vm.dtInstance = {};

    vm.dtOptions.data = [
        { Id: 1, subject: 'Listening', year: '2000', totalLesson: 15, learned: 2, classes: 'Grade 1', teacher:"Nguyễn Văn Hưng", skipClass: 1, tuition: 20000000, tuitionUnpaid :400000},
        { Id: 2, subject: 'reading', year: '2000', totalLesson: 14, learned: 4, classes: 'Grade 2', teacher: "Nguyễn Văn Hưng", skipClass: 2, tuition: 20000000, tuitionUnpaid: 400000 } ,
        { Id: 3, subject: 'wishtkjths', year: '2000', totalLesson: 17, learned: 7, classes: 'Grade 3', teacher: "Nguyễn Văn Hưng", skipClass: 2, tuition: 20000000, tuitionUnpaid: 400000 }
    ];


    //vm.dtOptions.data = $http.get('http://localhost:3000/api/v1/student/infor?')
    //    .then(function (response) {
    //        $scope.data = response.data;
    //    })
    //    .catch(function (error) {
    //        console.error('Error:', error);
    //    });
    function callback(json) {

    }

 

   


    $scope.reload = function () {
        reloadData(true);
    }
   



});


app.controller('detail', function ($scope, $uibModalInstance, studentId) {

    $scope.studentId = studentId;

    $scope.studentDetail = {
        id: studentId,
    };

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});



