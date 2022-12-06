$(document).ready(() => {
    $('.delete-recipe').click((e) => {
        var id = $(e.target).data("id");
        var url = '/delete/' + id;
        console.log(id)
        if (confirm('Bạn có muốn xóa công thức này không?')) {
            $.ajax({
                url: url,
                type: 'POST',
                success: () => {
                    console.log('Loading ...');
                    window.location.href = '/';
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    });

    $('.edit-recipe').click((e) => {
        $('#edit-form-name').val($(e.target).data('name'));
        $('#edit-form-ingredients').val($(e.target).data('ingredients'));
        $('#edit-form-directions').val($(e.target).data('directions'));
        $('#edit-form-id').val($(e.target).data('id'));
    })
});