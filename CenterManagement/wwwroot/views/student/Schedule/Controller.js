var ctxfolder = "/views/student/Schedule";

var app = angular.module("App_ESEIM", ["ngRoute", "ngResource", "ui.bootstrap", "datatables"]);

//var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngCookies", "ngValidate", "datatables", "datatables.bootstrap", "pascalprecht.translate", "ngJsTree", "treeGrid", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', 'ui.select', 'ui.tinymce', 'dynamicNumber', 'ngTagsInput']);

app.controller("Ctrl_ESEIM", function ($scope, $rootScope) {

    $rootScope.studentData = {
        "id": 23,
        "name": "tiếng anh",
        "year": 2024,
        "grade": "3.1",
        "status": "Mở đăng ký",
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

        //.withOption('ajax', {
        //    url: "/TimekeepingData/HRLeaveType/JTable",
        //    beforeSend: function (jqXHR, settings) {
        //        App.blockUI({
        //            target: "#contentMain",
        //            boxed: true,
        //            message: 'loading...'
        //        });
        //    },
        //    type: 'POST',
        //    data: function (d) {
        //        d.Code = $scope.model.Code;
        //        d.Name = $scope.model.Name;
        //        d.Coefficient = $scope.model.Coefficient;
        //        d.IsSubsidize = $scope.model.IsSubsidize;

        //    },
        //    complete: function () {
        //        App.unblockUI("#contentMain");
        //    }
        //})
        //.withDataProp('data') // Cách cũ để chỉ định thuộc tính dữ liệu

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
        //.withOption('columnDefs', [
        //    { targets: 0, visible: false },  // Ẩn cột đầu tiên          
        //])
        .withOption('createdRow', function (row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        });

    vm.dtColumns = [
        DTColumnBuilder.newColumn('time').withTitle(' ').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Thứ 2').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Thứ 3').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Thứ 4').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Thứ 5').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Thứ 6').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Thứ 7').renderWith(function (data, type) {
            return data;
        }),
        DTColumnBuilder.newColumn(null).withTitle('Chủ nhật').renderWith(function (data, type) {
            return data;
        }),
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


});