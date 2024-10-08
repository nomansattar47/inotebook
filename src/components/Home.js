import Alert from "./Alert"
import Notes from "./Notes"
import Toast from "./Toast"



const Home = () => {
    const toastMessage = (event) => {
        const toastTrigger = document.getElementById('liveToastBtn')
        const toastLiveExample = document.getElementById('liveToast')
        
        if (toastTrigger) {

            console.log("clicked here:::: ")
            toastLiveExample.classList.add('show')
            setTimeout(() => {
                console.log("timeOut here:::: ")
                toastLiveExample.classList.remove('show')
                toastLiveExample.classList.add('hide')
            }, 3000);
            //const toast = new bootstrap.Toast(toastLiveExample)
            //toast.show()

        }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" id="liveToastBtn" onClick={toastMessage}>Show live toast</button>
            <Notes />
        </div>
    )
}

export default Home
