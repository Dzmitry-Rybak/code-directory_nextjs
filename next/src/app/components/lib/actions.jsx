"use server"

export async function postQuestion (formData) {
    const rawFormData = {
            question: formData.get('question'),
            answer: formData.get('answer'),
            stack: formData.get('stack'),
            language: formData.get('language'),
        };

    await fetch()

    console.log(rawFormData)
}