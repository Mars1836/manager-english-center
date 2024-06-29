# Dự án website quản lý trung tâm tiếng anh

# Introdution

Thành viên nhóm:           

    - Đặng Minh Phương          CT060331
    
    - Nguyễn Văn Hưng           CT060116
    
    - Vũ Công Hậu               CT060111

# Công việc của từng thành viên trong nhóm:
- Hậu: Xây dựng Database, viết API

- Hưng, Phương: Xây dựng giao diện người dùng.

# Các bước cài đặt project.

Điều kiện tiên quyết:

- SDKs .NET 6.0: Cần tải SDKs .NET 6.0 từ trang chính thức của microsoft (https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-6.0.31-windows-x64-installer).

- NodeJs: Cần tải Node.js từ trang chính thức (https://nodejs.org/en). Quá trình cài đặt sẽ cung cấp Node.js runtime và npm (Node Package Manager).

Môi trường phát triển (IDE): Có thể dùng bất kỳ môi trường phát triển tích hợp nào như Visual Studio Code, WebStorm hoặc Atom. Trong trường hợp này ta sẽ sử dụng Visual Studio Code.

Cài đặt extension C# Dev Kit vào Visual Studio Code.

Các bước cài đặt: - Clone repo về máy - Mở terminal nhập npm install(Câu lệnh để tải thư viện) - Nhập npm start -> enter (hoặc sử dụng yarn start - nên dùng yarn) - Sau khi tiến trình kết thúc nếu có thư mục node_modules tức là đã cài thành công.

# Cấu trúc dự án:

*Front-end
- Thư mục wwwroot: chứa các thư mục phụ trợ cho các màn chính tại Areas và Views.
- Thư mục Views: Chứa màn hình chính của trang web (Hiển thị đầu tiên khi truy cập).
- Thư mục Areas: Chứa các màn chức năng khi đăng nhập với các vai trò cụ thể (Admin, Học sinh, Giáo viên, Phụ huynh).
- Thư mục Controllers: Gắn router cho màn chính (Views).
- Thư mục Properties: Chứa file deploy.

*Back-end
- Thư mục configs: Chứa các file cài đặt
- Thư mục controllers: Chứa các tệp điều khiển (controllers) quản lý luồng dữ liệu giữa client và server.
- Thư mục core: Chứa các đối tượng Error và Success được custom
- Thư mục dbs: Chứa các file connect.
- Thư mục helpers: Chứa các tệp trợ giúp (helpers) chứa các hàm tiện ích có thể được sử dụng lại trong toàn bộ ứng dụng.
- Thư mục middlewares: Chứa các tệp trung gian (middlewares) để xử lý các yêu cầu HTTP trước khi chúng được chuyển đến controllers.
- Thư mục models:Chứa các tệp mô hình (models) đại diện cho cấu trúc dữ liệu và tương tác với cơ sở dữ liệu.
- Thư mục routes: Chứa các tệp định tuyến (routes) xác định các điểm cuối (endpoints) của ứng dụng và ánh xạ chúng tới các controllers tương ứng.
- Thư mục services: Chứa các tệp dịch vụ (services) cung cấp các logic kinh doanh và các chức năng liên quan đến nghiệp vụ.
- Thư mục utils:Chứa các tệp tiện ích bao gồm các hàm dùng chung trong toàn bộ ứng dụng.

# Một số framework làm front-end:

- Boostrap.
- AngularJS.

# Định hướng làm CSDL sử dụng MongoDB.

# Một số framework làm back-end:
- ExpressJS.
- ASP.NET.

# Chạy project:

Có thể chạy trên Visual Studio hoặc Visual Studio Code. Trong trường hợp này ta dùng Visual Studio Code

*Chạy phần back-end:
- Bước 1: Mở thư mục backend (Chứa thư mục src).
- Bước 2: Chạy lệnh: npm i.
- Bước 3: Chạy lệnh npm start.

*Chạy phần front-end:
- Bước 1: Chạy lệnh: cd CenterManagement (Thư mục gốc chứa file .sln).
- Bước 2: Chạy lệnh: dotnet build.
- Bước 3: Chạy lệnh: cd CenterManagement (Thư mục con của thư mục gốc tại bước 1).
- Bước 4: Chạy lệnh: dotnet run.

Nếu chạy trên Visual Studio thì mở file .sln sau đó bấm Ctrl + F5
