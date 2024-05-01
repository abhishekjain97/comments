// Initially the textbox and reply is visible
// Whenever we click on "Comment"
// Check if there is any comment
// if there is, add a comment element to the CommentsContainer
// That element should contain a couple of things
// Comment Text
// Reply Button
// Replycontainer
// Add an event listener to the "Reply" button of each comment
// Whenever I click on reply
// Check if anything is present in reply textarea
// Add a reply element in the replyContainer

const dataArr = []
let commentCount = 1

// Selection
const submitButton = document.getElementById("submitComment")
const commentInput = document.getElementById("commentInput")
const commentsContainer = document.getElementById("commentsContainer")

if(localStorage.getItem("comments")) {
    
    const comments = JSON.parse(localStorage.getItem("comments"))

    commentCount = comments.length + 1

    comments.forEach((comment) => {
        addComment(comment.comment, comment.comment_id)

        const element = document.getElementById(comment.comment_id)
        comment.reply.forEach((rply) => {
            relpyComment(element, rply.comment, false)
        })
    })
}

submitButton.addEventListener('click', () => {
    // Grab comment input
    const commentText = commentInput.value.trim()

    if(commentText) {
        addComment(commentText, commentCount)
        commentInput.value = ""
        commentCount = commentCount + 1
    }
})

commentsContainer.addEventListener("click", function(e) {
    // console.log(e.target.parentElement);
    if(e.target.tagName == 'BUTTON') {
        relpyComment(e, "", true)
    }
})

function relpyComment(e, value, isNew) {
    let replyText
    let reply_container
    let comment_id
    if(isNew) {
        replyText = e.target.parentElement.querySelector(".replyInput").value
        reply_container = e.target.parentElement.querySelector(".repliesContainer")

        comment_id = e.target.parentElement.id
    } else {
        replyText = value
        reply_container = e.querySelector(".repliesContainer")

        comment_id = e.id
    }
    
    const reply_div = document.createElement("div")
    reply_div.setAttribute("class", "reply")

    const reply_output = `<p>${replyText}</p>`

    reply_div.innerHTML = reply_output

    reply_container.appendChild(reply_div)

    console.log(replyText, comment_id, reply_container, reply_div);

    const current_comment = dataArr.find((ele) => ele.comment_id == comment_id)
    current_comment.reply.push({
        'comment'  :  replyText
    })

    localStorage.setItem("comments", JSON.stringify(dataArr))

    if(isNew) {
        e.target.parentElement.querySelector(".replyInput").value = ""
    }
}

function addComment(value, commentId) {
    const commentElement = document.createElement("div")
    commentElement.classList.add("comment")
    commentElement.setAttribute("id", commentId)
    commentElement.innerHTML = `
        <p>${value}</p>
        <button class="replyBtn">Reply</button>
        <div class="repliesContainer">
        </div>
        <textarea class="replyInput" placeholder="Write a reply..."></textarea> 
    `
    commentsContainer.appendChild(commentElement)

    dataArr.push({
        'comment_id' : commentId,
        'comment'    : value,
        'reply'      : []
    })
    localStorage.setItem("comments", JSON.stringify(dataArr))
    
}