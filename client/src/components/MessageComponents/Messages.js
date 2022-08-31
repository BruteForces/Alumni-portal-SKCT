import React, { useEffect, useRef, useState } from "react";
import styles from "./Messages.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import ChatCard from "./ChatCard";
import { RiSearch2Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosSend } from "react-icons/io";
import ChatBubble from "./ChatBubble.js";
import useGetConversationsForUser from "hooks/useGetConversationsForUser";
import useGetMessagesForConversation from "hooks/useGetMessagesForConversation";
import Loader from "components/UI/Loader";
import useGetConversationByID from "hooks/useGetConversationByID";
import { useAuthContext } from "context/auth/authContext";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { GrFormClose } from "react-icons/gr";
import ReactPortal from "components/Modal/ReactPortal";

const ChatSelectPage = ({
  isConversationsLoading,
  isMessagesActive,
  onClose,
  onChatSelect,
  conversations,
}) => {
  const onChatSelectHandler = (conversationId) => {
    onChatSelect(conversationId);
  };

  const onCloseHandler = () => {
    onClose();
  };

  return (
    <>
      <div className={styles.messages_header}>
        Messages
        <div className={styles.messages_actions}>
          <RiSearch2Line className={styles.add_btn} fontSize={20} />
          <GrFormClose
            className={styles.arrow_btn}
            fontSize={20}
            onClick={onCloseHandler}
          />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div
          className={`${styles.chat_container} ${isMessagesActive && styles.active
            }`}
        >
          {isConversationsLoading ? (
            <Loader />
          ) : (
            conversations?.map((conversation) => (
              <ChatCard
                onSelect={onChatSelectHandler}
                conversation={conversation}
              />
            ))
          )}
        </div>
      </>
    </>
  );
};

const ChatPage = ({
  isMessagesActive,
  messages,
  onMinimize,
  isMessagesLoading,
  onGoBack,
  conversationId,
  onSendNewMessage,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { conversation, isLoading, error } =
    useGetConversationByID(conversationId);
  const { user } = useAuthContext();
  const { fetchData: sendMessage } = useAxiosWithCallback();
  const recipient = conversation?.participants?.filter(
    (person) => person._id !== conversation?.createdBy._id
  )[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmitHandler = () => {
    const messageConfig = {
      url: "/api/v1/conversation/message/" + conversationId,
      headers: {
        Authorization: "Bearer " + user?.token,
      },
      method: "post",
      data: {
        content: message,
      },
    };
    sendMessage(messageConfig);
    onSendNewMessage();
    setMessage("");
  };

  return (
    <>
      <div className={styles.messages_header}>
        <div className={styles.chat_profile}>
          <div>
            <IoIosArrowBack
              className={styles.back_btn}
              fontSize={20}
              onClick={onGoBack}
            />
          </div>
          <img
            src={`/api/v1/users/user-avatar/${conversation?.createdBy?._id}`}
            alt=""
          />
          <div>{recipient?.name}</div>
        </div>
        <div className={styles.messages_actions}>
          <RiArrowDropDownLine
            className={styles.arrow_btn}
            fontSize={35}
            onClick={onMinimize}
          />
        </div>
      </div>

      <>
        <hr className={styles.hr_header} />
        <div
          className={`${styles.chat_container} ${styles.chat} ${isMessagesActive && styles.active
            }`}
        >
          {isMessagesLoading ? (
            <Loader />
          ) : (
            messages?.map(({ content, sender }) => {
              return (
                <ChatBubble
                  type={sender === user?._id ? 1 : 0}
                  message={content}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
          <div className={styles.input_container}>
            <span
              class={styles.textarea}
              role="textbox"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => setMessage(e.currentTarget.textContent)}
            >
              {message}
            </span>
            <IoIosSend
              font-size={30}
              className={styles.send_btn}
              onClick={onSubmitHandler}
            />
          </div>
        </div>
      </>
    </>
  );
};

const Messages = ({ onClose }) => {
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [isMessagesActive, setIsMessagesActive] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState();

  const {
    messages,
    isLoading: isMessagesLoading,
    error: errorOnMessages,
    trigger,
  } = useGetMessagesForConversation(selectedConversation);

  const {
    conversations,
    isLoading: isConversationsLoading,
    error: errorOnConversation,
  } = useGetConversationsForUser();

  const onChatSelectHandler = (conversationId) => {
    setSelectedConversation(conversationId);
    setIsChatSelected(true);
  };

  const onMinimize = () => {
    setIsMessagesActive((prev) => !prev);
  };

  const onCloseHandler = () => {
    onClose();
  };

  const onGoBackHandler = () => {
    setIsChatSelected(false);
  };
  const newMessageHandler = () => {
    trigger();
  };

  return (
    <ReactPortal wrapperId="messages_content_wrapper">
      <div
        className={`${styles.messages_container} ${isMessagesActive && styles.active
          }`}
      >
        {!isChatSelected ? (
          <ChatSelectPage
            isMessagesActive={isMessagesActive}
            setIsMessagesActive={setIsMessagesActive}
            setIsChatSelected={setIsChatSelected}
            isConversationsLoading={isConversationsLoading}
            conversations={conversations}
            onMinimize={onMinimize}
            onChatSelect={onChatSelectHandler}
            onClose={onCloseHandler}
          />
        ) : (
          <ChatPage
            conversationId={selectedConversation}
            isMessagesLoading={isMessagesLoading}
            messages={messages}
            onMinimize={onMinimize}
            isMessagesActive={isMessagesActive}
            onGoBack={onGoBackHandler}
            onSendNewMessage={newMessageHandler}
          />
        )}
      </div>
    </ReactPortal>
  );
};

export default Messages;
