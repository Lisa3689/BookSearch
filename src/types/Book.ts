export type BookType = {
    id: string,
    volumeInfo: {
        title: string,
        authors: string[],
        description: string,
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string
        },
        categories: string[]
    }
}