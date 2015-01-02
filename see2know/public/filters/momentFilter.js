module.filter('fromNow', function () {
    return function (date) {
        return moment(date).fromNow();
    };
});

module.filter('moment', function () {
    return function (dateString, format) {
        return moment(dateString).format(format);
    };
});