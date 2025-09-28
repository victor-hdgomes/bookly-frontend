export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="py-6 text-center">
            <p>Todos os direitos reservados &copy; {year} - Bookly</p>
        </footer>
    )
}