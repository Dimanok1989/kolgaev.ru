const messageError = error => {

    if (typeof error.response == "object") {

        if (error.response.data) {

            if (error.response.data.message)
                return error.response.data.message;

            return error.response.statusText;

        }

    }

    console.error(error);
    return "Неизвестная ошибка";

}

const errors = error => {

    let errors = {}

    if (typeof error.response == "object") {

        if (typeof error.response.data == "object") {

            if (typeof error.response.data.errors == "object") {

                for (let id in error.response.data.errors) {

                    let row = error.response.data.errors[id];

                    if (row.name)
                        errors[row.name] = row.message || "Неизвестная ошибка";

                }

            }

        }

    }

    return errors;

}

export { messageError, errors };